import subprocess
Input = '3\n0 0\n10 10\n 0 10'
path = "d/project/S09P12A202/backend/BS/tools/cpptest.exe"

# path = 'ls'

# TODO: OS가 Window일때만 git bash로 우회. EC2 배포시 삭제 요망
# git_bash_path = r"C:\Program Files\Git\bin\bash.exe"
# command = git_bash_path + ' ' + '-c '
command = r'echo "3\n0.0 0.0\n10.0 0.0\n10.0 10.0"|"D:\project\S09P12A202\backend\BS\tools\cpptest.exe"'
    # 실행.
process = subprocess.Popen([command], stdout=subprocess.PIPE, stderr=subprocess.PIPE,
                               text=True)
process.wait()
stdout, stderr = process.communicate(input = Input)
print(stdout)
print(stderr)