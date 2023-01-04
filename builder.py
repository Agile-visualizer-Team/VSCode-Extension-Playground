import os
import shutil

shutil.rmtree(os.path.join(os.path.dirname(__file__), 'dist'))
shutil.copytree(os.path.join(os.path.dirname(__file__), 'src', 'visualizer-graph', 'src',
                'cytoscape-snapper', 'browser'), os.path.join(os.path.dirname(__file__), 'dist', 'browser'))
