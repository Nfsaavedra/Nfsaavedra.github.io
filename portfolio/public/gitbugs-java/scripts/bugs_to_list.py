import os
import json
from unidiff import PatchSet

benchmark = "gitbugs-java"

with open('../gitbugs-java.json', 'w') as gitbugs_java:
    bugs_path = '../website/bugs'
    bugs = {}

    for bugs_file in os.listdir(bugs_path):
        if not bugs_file.endswith('.json') or bugs_file == 'data.json':
            continue
        with open(os.path.join(bugs_path, bugs_file), 'r') as f:
            lines = f.readlines()
            for line in lines:
                if line.strip() != "":
                    bug = json.loads(line)
                    final_bug = {
                        'repo': bug['repository'],
                        'previous_commit': bug['previous_commit_hash'][:12],
                        'commit': bug['commit_hash'][:12],
                        'strategy': bug['strategy'],
                        'change_type': bug['change_type'],
                        'commit_message': bug['commit_message'],
                        'committed_at': bug['commit_timestamp'],
                        'previous_commit_at': bug['previous_commit_timestamp'],
                        'time_to_patch': bug['time_to_patch'],
                        'benchmark': benchmark,
                        'language': bug['language'],
                        'failed_tests': [],
                        'files': {
                            'added': [],
                            'modified': [],
                            'deleted': [],
                        },
                        'metrics': {
                        }
                    }

                    patch = PatchSet(bug['bug_patch'])

                    if bug['strategy'] == 'PASS_PASS':
                        failed_run = bug['actions_runs'][1][0]
                    elif bug['strategy'] == 'FAIL_PASS':
                        failed_run = bug['actions_runs'][0][0]

                    for test in failed_run['tests']:
                        for result in test['results']:
                            if result['result'] == 'Failure':
                                final_bug['failed_tests'].append({
                                    'classname': test['classname'],
                                    'name': test['name'],
                                    'message': result['message'],
                                    'type': result['type']
                                })
                                break

                    for added_file in patch.added_files:
                        final_bug['files']['added'].append(added_file.path)
                    for modified_file in patch.modified_files:
                        final_bug['files']['modified'].append(modified_file.path)
                    for deleted_file in patch.removed_files:
                        final_bug['files']['deleted'].append(deleted_file.path)

                    final_bug['metrics']['addedLines'] = patch.added
                    final_bug['metrics']['removedLines'] = patch.removed
                    final_bug['metrics']['patchSize'] = patch.added + patch.removed
                    final_bug['metrics']['hunks'] = sum([len(file) for file in patch]) 

                    id = bug['repository'].replace('/', '-') + '-' + final_bug['commit']
                    final_bug['bugId'] = id
                    bugs[id] = final_bug

                    bug_path = os.path.join(f'../bugs/{benchmark}', id)
                    if not os.path.exists(bug_path):
                        os.makedirs(bug_path)

                    with open(os.path.join(bug_path, 'patch.diff'), 'w') as patch_file:
                        patch_file.write(str(patch))

                    with open(os.path.join(bug_path, 'prev_commit.log'), 'w') as patch_file:
                        patch_file.write(bug['actions_runs'][0][0]['stdout'])

                    if bug['strategy'] == 'PASS_PASS':
                        with open(os.path.join(bug_path, 'test_patch.diff'), 'w') as patch_file:
                            patch_file.write(bug['test_patch'])
                        with open(os.path.join(bug_path, 'prev_commit_w_diff.log'), 'w') as patch_file:
                            patch_file.write(bug['actions_runs'][1][0]['stdout'])

                    with open(os.path.join(bug_path, 'current_commit.log'), 'w') as patch_file:
                        patch_file.write(bug['actions_runs'][2][0]['stdout'])

    
    gitbugs_java.write(json.dumps(bugs))

