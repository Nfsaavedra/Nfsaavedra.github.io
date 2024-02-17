import os
import json
from unidiff import PatchSet

benchmark = "gha-repair"

with open('../gha-repair.json', 'w') as gitbug_java:
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
                        'commit_message': bug['commit_message'],
                        'committed_at': bug['commit_timestamp'],
                        'previous_commit_at': bug['previous_commit_timestamp'],
                        'benchmark': benchmark,
                        'language': bug['language'],
                        'files': {
                            'added': [],
                            'modified': [],
                            'deleted': [],
                        },
                        'metrics': {
                        }
                    }

                    patch = PatchSet(bug['patch'])

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

    
    gitbug_java.write(json.dumps(bugs))

