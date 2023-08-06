import subprocess
from django.db.models import Q

from artwork.models import Voronoipoint, Voronoiresult, Artwork
from exhibition.models import Exhibition

def get_artwork_count(exhibition):
    return Artwork.objects.filter(exhibition = exhibition).count()

def find_artwork_by_Id(id):
    return Artwork.objects.filter(artworkid = id).first()

def find_artwork_by_exhibition(exhibition):
    return Artwork.objects.filter(exhibition = exhibition)

def delete_artwork_by_Id(id):
    artwork = Artwork.objects.filter(artworkid = id).first()
    artwork.delete()

def get_other_artwork(id):
    return Artwork.objects.filter(~Q(artworkid = id)).first()

def get_nearby_artwork(id):
    result = set()
    voronoiresult1 = Voronoiresult.objects.filter(cwartworkid = id)
    for pair in voronoiresult1:
        result.add()

def make_input_by_artworks(artworks):
    Input = str(len(artworks)) + '\n'
    for artwork in artworks:
        Input += (str(artwork.coorx) + ' ' + str(artwork.coory) + '\n')
    return Input

def put_artwork(artwork, **kwargs):
    for key in kwargs:
        artwork.__setattr__(key, kwargs[key])

def delete_VoronoiResult_by_exhibition(exhibition):
    Voronoipoint.objects.filter(exhibition = exhibition).delete()
    Voronoiresult.objects.filter(exhibition = exhibition).delete()

def getVoronoi(exhibition):
    count = get_artwork_count(exhibition)
    artworks = list(find_artwork_by_exhibition(exhibition))
    Input = make_input_by_artworks(artworks)

    # 미술품의 개수가 3개 이상일 때만 보로노이 실행

    if count <= 1:
        delete_VoronoiResult_by_exhibition(exhibition)
        return True
    if count == 2:
        delete_VoronoiResult_by_exhibition(exhibition)
        return True

    command = 'D:\\project\\S09P12A202\\backend\\BS\\tools\\cpptest.exe'

    # TODO: OS가 Window일때만 git bash로 우회. EC2 배포시 삭제 요망
    git_bash_path = '"C:\\Program Files\\Git\\bin\\sh.exe" --login'
    command = git_bash_path + ' ' + command

    print(command)
    # 실행.
    process = subprocess.Popen([command], stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                               text=True)

    stdout, stderr = process.communicate(input = Input)

    stdout = [ele.strip() for ele in stdout.split('_')]

    if process.returncode == 0:
        for i in range(len(stdout)):
            stdout[i] = stdout[i].split('\n')
            for j in range(len(stdout[i])):
                if i == 0:
                    stdout[i][j] = list(map(float, stdout[i][j].split(' ')))
                else:
                    stdout[i][j] = list(map(int, stdout[i][j].split(' ')))

        vertex, edge, area = stdout[0], stdout[1], stdout[2]

        delete_VoronoiResult_by_exhibition(exhibition)
        # 데이터 신규 생성
        for idx, point in enumerate(vertex):
            coorx, coory = point[0], point[1]
            Voronoipoint.objects.create(coorx=coorx, coory=coory, pointid=idx, exhibition=exhibition)
        for idx, e in enumerate(edge):
            point1id, point2id = e[0], e[1]
            cw1, cw2 = artworks[area[idx][0]].artworkid, artworks[area[idx][1]].artworkid
            Voronoiresult.objects.create(point1id=point1id, point2id=point2id, cwartworkid=cw1, ccwartworkid=cw2,
                                         exhibition=exhibition)
        return True
    else:
        return False