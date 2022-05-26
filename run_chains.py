import os
from subprocess import Popen
import sys
import time


counts = eval(sys.argv[1])
chains = []

for i in range(counts):
    print(f"=====\nRunning Blockchain peer #{i + 1}\n=====")
    chain_env = os.environ.copy()
    if i > 0:
        chain_env['HTTP_PORT'] = str(3001 + i)
        chain_env['P2P_PORT'] = str(5001 + i)
        chain_env['PEERS'] = ','.join([f'ws://localhost:500{j + 1}' for j in range(i)])
    chain = Popen(['node', 'src/app'], env=chain_env)
    chains.append(chain)
    time.sleep(1)

input('=====\nPress ENTER to finish\n=====')

for chain in chains:
    chain.terminate()
