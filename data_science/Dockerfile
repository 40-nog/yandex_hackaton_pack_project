FROM python:3.9

COPY ./src /data_science

WORKDIR /data_science

RUN pip install -r requirements.txt

CMD ["python", "app.py"]