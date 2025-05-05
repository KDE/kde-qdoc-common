This repo contains common files for KDE's API documentation. Individual projects include it in their documentation builds.

The files in the 'global' folder are forked from Qt. We can modify them at will, however we should periodically sync them with upstream to incorporate improvements from there.

## Building the website

Building the documentation website consists of two steps for each component: Prepare and generate.

This repository is responsible for the index.html page and other common files. It is built like any other documentation project.

First choose a destination directory for the build, e.g. /home/user/documentation

Then clone this repository, e.g. to /home/user/kde-qdoc-common, and set the KDE_DOCS evironment variable to it:

```
export KDE_DOCS=/home/user/kde-qdoc-common
```

Then configure each project (including this one) with CMake:

```
cmake -DDOC_DESTDIR=/home/user/documentation -B build .
```

Now run the prepare phase for each project (including this one):

```
cmake --build build -t prepare_docs
```

Now run the generate phase for each project (including this one):

```
cmake --build build -t generate_docs
```

Now the generated HTML files are available in the output directory.
