# Use a base image with Python installed (e.g., the official Python image)
FROM python:3

# Set a working directory (optional but recommended)
WORKDIR /docs

# Install MkDocs and any required packages or extensions
RUN pip install mkdocs
RUN pip install "mkdocs-material[imaging]"
RUN pip install mkdocs-nav-weight

# You can also install additional MkDocs extensions here if needed, e.g.:
# RUN pip install mkdocs-material

# Add your documentation to the image
COPY . /docs

# Build the MkDocs site
RUN mkdocs build

# Expose the default MkDocs port
EXPOSE 8000

# By default, serve the MkDocs site when the container starts
CMD ["mkdocs", "serve", "-a", "0.0.0.0:8000"]