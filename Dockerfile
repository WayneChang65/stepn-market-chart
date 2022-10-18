FROM httpd:2.4
RUN apt-get update && apt-get install -y wget git
COPY ./stepn-chart/ /usr/local/apache2/htdocs/