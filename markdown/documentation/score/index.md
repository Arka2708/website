---
title: Introduction
---

The ARGO Data Platform uses the score-client as a file download manager. The score-client facilitates the transfer of data with resumable download and has built in BAM/CRAM slicing to make data download fast and smooth.

Please note:

downloads are done in parts and can be paused/resumed as needed
the score-client will automatically resume downloads if interrupted or paused briefly

Transfer data quickly and easily to and from any cloud-based storage system.
Score facilitates the transfer and storage of your data seamlessly for cloud-based projects. File bundling, resumable downloads, and BAM/CRAM slicing make data transfer fast and smooth.

Genomic solutions
Slice and dice BAM and CRAM files with integrated command line tools.

Accessible
Once your server is set up, transferring data is simple. Access any data, anytime on all major cloud services.

Streamlined
Score’s parallel solution makes the upload and download of files efficient and fast.

Data Integrity
Leave corrupted files behind as downloaded files are always verified against their MD5sum.

Tracks and validate
The transfer protocols allow setup with any public or private cloud service.

Pick up where you left off
Score allows you to resume file transfer when a process stops mid-transfer.


# Features

## Metadata to File Validation


## Data Lifecycle Management 


## Flexible Data Model 


# Integrations
As a metadata management system, Song does not handle the complexities of cloud file upload. To handle this, Song is built to interact with a required companion application, [Score](/documentation/score), which manages secure and fast file upload & download, as well as standard genomic file applications, for example   viewing with  `samtools` to view or download portions of genomic files with `BAM Slicing`. 

As part of the larger Overture.bio software suite, Song can be optionally used with additional integrations, including:
- **[Event Streaming](/documentation/song/installation/configuration/kafka):** Built-in support for [Apache Kafka](https://kafka.apache.org/) event streaming.  
- **[Maestro](/documentation/maestro/):** Song is built to natively integrate with Maestro, which will easily index data into a configurable Elasticsearch index, to be used for convenient searching of data. 