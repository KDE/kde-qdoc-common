cmake_minimum_required(VERSION 3.16)

find_package(ECM 6.15 REQUIRED)

set(CMAKE_MODULE_PATH ${ECM_MODULE_PATH})

include(ECMGenerateQDoc)
include(ECMQueryQt)
include(KDEInstallDirs)

add_library(KDEIndex empty.cpp)

ecm_generate_qdoc(KDEIndex kde.qdocconf)
