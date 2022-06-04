import os
from subprocess import Popen
import sys
import time


counts = eval(sys.argv[1])
chains = []


print(f"=====\nRunning ICO Blockchain\n=====")
chain_env = os.environ.copy()
chain_env['HTTP_PORT'] = '3000'
chain_env['P2P_PORT'] = '5000'
chain = Popen(['node', 'src/ico'], env=chain_env)
chains.append(chain)
time.sleep(1)

for i in range(counts):
    print(f"=====\nRunning Blockchain peer #{i + 1}\n=====")
    chain_env = os.environ.copy()
    chain_env['HTTP_PORT'] = str(3001 + i)
    chain_env['P2P_PORT'] = str(5001 + i)
    chain_env['PEERS'] = ','.join([f'ws://localhost:500{j}' for j in range(i+1)])
    chain = Popen(['node', 'src/app'], env=chain_env)
    chains.append(chain)
    time.sleep(1)

input('=====\nPress ENTER to finish\n=====')

for chain in chains:
    chain.terminate()
