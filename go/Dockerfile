# Build stage
FROM golang:1.22 AS base

WORKDIR /app

COPY app .

RUN apt-get -y update && \
    apt-get -y upgrade && \
    go mod init app && \
    go build -o bin

# Deploy stage
FROM scratch

WORKDIR /app

COPY --from=base /app/bin .

ENTRYPOINT ["./bin"]