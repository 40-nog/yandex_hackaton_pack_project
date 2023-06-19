FROM python:3.9

COPY ./src /data_science

WORKDIR /data_science

RUN pip install -r requirements.txt

ENV PORT=8000

CMD ["python", "app.py"]