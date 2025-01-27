---
title: Command Reference
---

# Invoking a Command

To invoke a command, run the `score-client` executable and append any options required after the command with the necessary input values.

For example, invoking the `upload` command and using the `--manifest` option to provide a manifest file:

```shell
$ ./score-client-<latest-release-number>/bin/score-client upload --manifest ./<directory>/manifest.txt
```

# Commands

The following sub-sections are a reference listing of all the commands and command options currently supported by the Score client.

## Download

The `download` command downloads file object(s) from the remote storage repository.

| Option | Description |
| -------| ------------|
| `--analysis-id` | Download files for a specific [Song](/documentation/song) analysis ID. |
| `--force` | Force a re-download of the file if it already exists locally (overrides local file). |
| `--index` | If available, also download the file index. |
| `--length` | Limit the number of bytes to download to this value.  By default, if this option is not specified, all of the file will be downloaded. |
| `--manifest` | Download specific files based on a manifest file ID, manifest file URL, or path to the manifest file. |
| `--object-id` | Download a specific file object ID. |
| `--offset` | Byte position in the source file to begin download from.  By default, if this option is not specified, all of the file will be downloaded. |
| `--output-dir` | Path to the output directory where files will be downloaded to. |
| `--output-layout` | Layout of the output directory, one of: |
| | * `bundle` : Saved according to the filename under the Song bundle ID directory. |
| | * `filename` : Saved according to the filename in the output directory. |
| | * `id` : Saved according to the object ID in the output directory. |
| `--program-id` | Download files for a specific [Song](/documentation/song) program ID. |
| `--study-id` | Download files for a specific [Song](/documentation/song) study ID. |
| `--validate` | If available, perform validation on file MD5 checksum. |
| `--verify-connection` | First verify the connection to the object storage repository. |

## Help

The `help` command displays help information for the Score client commands and options.

## Info

The `info` command displays the active configuration information for the Score client.

| Option | Description |
| -------| ------------|
| `--verbose` | Displays an exhaustive list of all Score client configuration properties.  Without this option, only a reduced, minimal set of properties is displayed. |

## Manifest

The `manifest` command displays the contents of a specific Score manifest file.

| Option | Description |
| -------| ------------|
| `--manifest` | Manifest file ID, manifest file URL, or path to the manifest file that you want to display the contents for. |

## Mount

The `mount` command mounts a read-only [FUSE](https://github.com/libfuse/) file system view of the object storage repository that Score is using.

| Option | Description |
| -------| ------------|
| `--cache-metadata` | To make load times faster, you can optionally cache metadata on the local disk and use the cache if available. |
| `--daemonize` | Optionally detach the mount point and run it in the background instead. |
| `--layout` | Layout of the mount point directory, one of: |
| | * `bundle` : Nests files in the bundle directory. |
| | * `object-id` : Uses a flat list of files named by their associated object ID. |
| `--manifest` | Manifest file ID, manifest file URL, or path to the manifest file that you want to specifically mount contents for. |
| `--mount-point` | The mount point of the FUSE file system.  For this command to work, the mount point must exist, be empty and be executable by the current user. |
| `--options` | Additional mount options of the file system that you want to use. This may vary depending on the file system. E.g. `user_allow_other`, `allow_other`, `fsname=debug`, etc. |
| `--verify-connection` | First verify the connection to the object storage repository. |

## Upload

The `upload` command uploads file object(s) to the remote storage repository.

| Option | Description |
| -------| ------------|
| `--file` | Upload a specific file by providing the path to that file. |
| `--force` | Force a re-upload of the file if it already exists in the object storage (overrides file in the repository). |
| `--manifest` | Upload specific files using a manifest by providing the manifest file ID, manifest file URL, or path to the manifest file. |
| `--md5` | MD5 checksum value of the file to upload. |
| `--object-id` | Upload a specific file by providing its object ID. |
| `--validate` | If available, perform validation on file MD5 checksum. |
| `--verify-connection` | First verify the connection to the object storage repository. |

## Url

The `url` command displays the URL of a specific file object in the object storage repository.

| Option | Description |
| -------| ------------|
| `--object-id` | Object ID of the specific file you want to display the URL for. |

## Version

The `version` command displays the Score client's version information.

## View

The `view` command locally stores and displays some or all contents of a [SAM or BAM](https://samtools.github.io/hts-specs/SAMv1.pdf) file.

| Option | Description |
| -------| ------------|
| `--bed-query` | You can optionally specify a file in [BED](https://m.ensembl.org/info/website/upload/bed.html) format containing specific ranges to query.  This option overrides the `--query` option. |
| `--contained` | Only output sequence alignments completely contained in a specific region.  If this option is not used, then by default any alignment that intersects with a specified region will be returned. |
| `--header-only` | Only output the header of the SAM or BAM file. |
| `--input-file` | Local path to the BAM file being queried.  This option supercedes the `--object-id` option. |
| `--input-file-index` | Local path to index file. This requires the `--input-file` option to also be provided. |
| `--manifest` | Manifest file ID, manifest file URL, or path to the manifest file containing object IDs and ranges that you want to query for. |
| `--object-id` | Specific object ID inside a BAM file from which to download a slice from.  This option supercedes the `--manifest` option. |
| `--output-file` | Name of the file to write output to.  If not specified, then the metadata filename or the original input filename will be used by default. |
| `--output-format` | File format being queried and written to output, either `SAM` or `BAM`. |
| `--output-dir` | Path to the output directory where the output file will be stored.  Only used with the `--manifest` option. |
| `--output-index` | Indicates whether to write index files to output.  Only used with the `--manifest` option. |
| `--output-original-header` | Output the original header in its entirety. |
| `--output-type` | Structure of the output file containing query results. One of: `CROSS`, `MERGED`, or `TRIMMED`.  Only used with the `--manifest` option. |
| `--query` | Query used to define what contents to extract from a BAM file. You must use coordinate format (`sequence:start-end`).  Note that multiple ranges must be separate by a space. |
| `--reference-file` | Local path to the [FASTA](https://blast.ncbi.nlm.nih.gov/Blast.cgi?CMD=Web&PAGE_TYPE=BlastDocs&DOC_TYPE=BlastHelp) file that a [CRAM](https://samtools.github.io/hts-specs/CRAMv3.pdf) file was encoded with. |
| `--stdout` | Indicates whether to send output to `stdout` instead of a file.  Only used with the `--object-id` option and output will always be forced to SAM format. |
| `--verify-connection` | First verify the connection to the object storage repository. |

# Extra Options

Here is a list of additional option flags that can be used when the `score-client` executable itself:


| Option | Description | 
| -------| ------------| 
| `--profile` | Define a specific environment profile used to resolve configuration properties.  If not specified, the default profile is used. |
| `--quiet` | Run client in quiet mode, with a reduced, minimal set of info messages displayed during execution. |
| `--silent` | Run client in silent mode, without any additional info messages displayed during execution. |