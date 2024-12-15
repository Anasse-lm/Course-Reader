import subprocess
import webbrowser
def run_node_script():
    try:
        # Define the command to run
        command = ["node", "./backend/app.js"]

        # Run the command using subprocess.Popen
        process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

        # Wait for the process to complete and capture output
        stdout, stderr = process.communicate()

        # Check if there were any errors
        if process.returncode != 0:
            print(f"Error occurred: {stderr.decode('utf-8')}")
        else:
            print(f"Node script executed successfully: {stdout.decode('utf-8')}")

            # Open web browser to http://localhost:5000/
            webbrowser.open('http://localhost:5000/')
    except Exception as e:
        print(f"Error occurred: {str(e)}")

# Execute the function when the script is run
if __name__ == "__main__":
    run_node_script()

# Automate this : click on dir cmd -> cd path/Coursera-reader -> py run.py -> make run.py an run.exe 