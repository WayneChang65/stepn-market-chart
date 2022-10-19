FROM httpd:2.4
RUN apt-get update && apt-get install -y wget git
COPY ./stepn-market-chart/ /usr/local/apache2/htdocs/