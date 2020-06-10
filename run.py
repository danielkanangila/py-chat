import subprocess
from application import create_app
#from livereload import Server
from flask.cli import FlaskGroup

app = create_app()
cli = FlaskGroup(create_app=create_app)

@cli.command()
def dev():
    subprocess.Popen(["flask", "run"])
    subprocess.run(["npm", "run", "watch"])

if __name__ == '__main__':
    cli()
    # server = Server(app.wsgi_app)
    # server.serve()
