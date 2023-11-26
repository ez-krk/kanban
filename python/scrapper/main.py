import threading
import schedule
import time
from sources.superteam import scrap_superteam

# def job():
#     print("I'm running on thread %s" % threading.current_thread())
#     scrap_superteam()

# def run_threaded(job_func):
#     job_thread = threading.Thread(target=job_func)
#     job_thread.start()

# schedule.every().day.at("00:00").do(run_threaded, job)

# while True:
#     schedule.run_pending()
#     time.sleep(1)

scrap_superteam()