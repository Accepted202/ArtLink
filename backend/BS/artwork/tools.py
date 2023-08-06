import subprocess

from artwork.models import Voronoipoint, Voronoiresult, Artwork
from exhibition.models import Exhibition

def get_artwork_count(exhibition):
    return Artwork.objects.count(exhibition = exhibition)

def delete_artwork_by_exhibition(exhibition):
    Voronoipoint.objects.delete(exhibition=exhibition)
    Voronoiresult.objects.delete(exhibition=exhibition)

def getVoronoi(input, exhibition):
    count = get_artwork_count(exhibition)

    # 미술품의 개수가 3개 이상일 때만 보로노이 실행

    if count == 1:
        delete_artwork_by_exhibition(exhibition)
        return True
    if count == 2:
        delete_artwork_by_exhibition(exhibition)
        return True

    command = "tools/cpptest.exe" + " " + input

    # TODO: OS가 Window일때만 git bash로 우회. EC2 배포시 삭제 요망
    git_bash_path = r"C:\Program Files\Git\bin\bash.exe"
    command = git_bash_path + ' ' + '-c ' + command

    # 실행.
    process = subprocess.Popen([command], stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                               text=True)

    stdout, stderr = process.communicate()
    vertex, edge, area = [], [], []
    if process.returncode == 0:
        stdout = stdout.split('_')
        for i in range(len(stdout)):
            stdout[i] = stdout[i].split('\n')
            for j in range(len(stdout[i])):
                if stdout[i][j] == '':
                    continue
                if i == 0:
                    stdout[i][j] = list(map(float, stdout[i][j].split(' ')))
                    vertex.append(stdout[i][j])
                else:
                    stdout[i][j] = list(map(int, stdout[i][j].split(' ')))
                    if (i == 1):
                        edge.append(stdout[i][j])
                    else:
                        area.append(stdout[i][j])
        delete_artwork_by_exhibition(exhibition)
        # 데이터 신규 생성
        for idx, point in enumerate(vertex):
            coorx, coory = point[0], point[1]
            Voronoipoint.objects.create(coorx=coorx, coory=coory, pointid=idx, exhibition=exhibition)
        for idx, e in enumerate(edge):
            point1id, point2id = e[0], e[1]
            cw1, cw2 = area[idx][0], area[idx][1]
            Voronoiresult.objects.create(point1id=point1id, point2id=point2id, cwartworkid=cw1, ccwartworkid=cw2,
                                         exhibition=exhibition)
        return True
    else:
        return False