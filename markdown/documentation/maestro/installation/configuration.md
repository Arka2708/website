---
title: Configuring Maestro
---

During the initial [installation](/documentation/maestro/installation/installation) and setup of Maestro, certain mandatory configurations had to be provided before the service could start.

However in this section, we describe some optional configurations that you may wish to use.

# Configuring Elasticsearch

The `elasticsearch` section of the configuration file allows you to set the properties for the Elasticsearch server and client.  In the server portion, you can configure the default indexes used, while in the client portion, various client authentication and timeout settings are available.

To view these settings:

1. From your command line, switch to the `config` directory and locate the `application.yml` file:

```shell
cd maestro/maestro-app/src/main/resources/config
```

2. Open the file, locate the `elasticsearch`  section and exaine the `indexes` and `client` portions:

```yaml
  # elastic search server to connect to & client properties
  elasticsearch:
    # elasticsearch server nodes to send requests to
    clusterNodes:
      - http://localhost:9200

    # the index name to store documents in (will be created if not existing)
    indexes:
      fileCentric:
          name: file_centric_1.0
          alias: file_centric
          enabled: true
      analysisCentric:
          name: analysis_centric_1.0
          alias: analysis_centric
          enabled: true

    # elasticsearch client properties
    client:
      basicAuth:
        enabled: false
        user: elastic
        password: dummy-pass
      trustSelfSignedCert: false
      # this is to control the number of documents per bulk request in elasticsearch
      docsPerBulkReqMax: 5000
      # max time to wait for a connection to be established
      connectionTimeout: 5000
      # max time to wait on idle connection (no data flow)
      socketTimeout: 10000
      # in case of failure this controls the retry attempts
      retry:
        # maximum number of retry attempts before throwing an error
        maxAttempts: 3
        # waiting between retries (ms)
        waitDurationMillis: 500

```

## Indexes

By default, Maestro supports two Elasticsearch index mappings, `file_centric` and `analysis_centric`, which are enabled by default.

You can disable whichever index you do not need in the `indexes` section by setting the `enabled` property to `false`.

```yaml
# the index name to store documents in (will be created if not existing)
indexes:
  fileCentric:
      name: file_centric_1.0
      alias: file_centric
      enabled: true
  analysisCentric:
      name: analysis_centric_1.0
      alias: analysis_centric
      enabled: true
```

The default mappings can be found in the Maestro GitHub repository here:

* [`file_centric`](maestro-app/src/main/resources/file_centric.json)
* [`analysis_centric`](maestro-app/src/main/resources/analysis_centric.json)

## Elasticsearch Client

In the `client` section, you can configure the properties of the Elasticsearch client.  Maestro uses the `elasticsearch-rest-high-level-client` provided by Elastic (see [here]()) and exposes a few of the configurations, specifically:

| Property | Description |
|----------|-------------|
| `basicAuth` -> `enabled` | If set to `true`, allows you to configure basic authentication for the Elasticsearch client, if this auth method is used by the server. |
| `basicAuth` -> `user` | Username that the Elasticsearch client will use to authenticate with the server. Only used if `enabled` = `true`. |
| `trustSelfSignedCert` | If set to `true`, allows the client to accept self-signed certificates, if the server is using one.  Otherwise, it will not accept self-signed certificates. |

The remaining properties are used to tune the batch indexing, connection timeouts and retries, etc.

For example:

```yaml
# elasticsearch client properties
client:
  basicAuth:
    enabled: false
    user: elastic
    password: dummy-pass
  trustSelfSignedCert: false
  # this is to control the number of documents per bulk request in elasticsearch
  docsPerBulkReqMax: 5000
  # max time to wait for a connection to be established
  connectionTimeout: 5000
  # max time to wait on idle connection (no data flow)
  socketTimeout: 10000
  # in case of failure this controls the retry attempts
  retry:
    # maximum number of retry attempts before throwing an error
    maxAttempts: 3
    # waiting between retries (ms)
    waitDurationMillis: 500
```

# Configuring Kafka Topics

If you have setup Maestro to integrate with Kafka, then you must configure specific Kafka topics that Maestro will listen for in order to trigger indexing operations.

By default, the configuration file contains a setup for a basic Kafka integration with Song and Maestro.  We will verify that this configuration section is correct.  If modifications or correctinos are required, you can update the file then restart the service.

For example:

1. From your command line, switch to the `config` directory and locate the `application.yml` file:

```shell
cd maestro/maestro-app/src/main/resources/config
```

2. Open the file, locate the `spring` -> `cloud` -> `stream` -> `bindings`  section verify the following:

| Property | Description |
|----------|-------------|
| `input` -> `destination` | This topic listens for on-demand request messages instead of requests coming over the JSON web API. This value must match the topic you have configured in Kafka itself. In typical deployments, you can create a topic in Kafka called `maestro_index_request` and set the value in the config file here. |
| `input` -> `group` | This is the Kafka consumer group name for the input channel topic that you configured above.  You can use the default or change the value. |
| `songInput` -> `destination` | This topic specifically listens for updates to Song analyses. This value must match the topic you have configured in Kafka itself. In typical deployments, you can create a topic in Kafka called `song-analysis` and set the value in the config file here. |
| `songInput` -> `group` | This is the Kafka consumer group name for the `songInput` channel topic that you configured above.  You can use the default or change the value. |

For more details on these configurations, see the [Spring cloud streams documentation](https://docs.spring.io/spring-cloud-stream/docs/3.0.10.RELEASE/reference/html/spring-cloud-stream.html#_configuration_options).

```yaml
spring:
  application:
    name: maestro
  output.ansi.enabled: ALWAYS
  cloud:
    stream:
      # kafka integration with song (remove this key to disable kafka)
      kafka:
        binder:
          brokers: localhost:9092
        bindings:
          songInput:
            consumer:
              enableDlq: true
              dlqName: maestro_song_analysis_dlq
              autoCommitOnError: true
              autoCommitOffset: true
          input:
            consumer:
              enableDlq: true
              dlqName: maestro_index_requests_dlq
              autoCommitOnError: true
              autoCommitOffset: true
      bindings:
        input:
          # we don't specify content type because @StreamListener will handle that
          destination: maestro_index_requests
          group: requestsConsumerGrp
          consumer:
            maxAttempts: 1
        songInput:
          destination: song-analysis
          group: songConsumerGrp
          consumer:
            maxAttempts: 1

```

3. If necessary, make any modifications or corrections, save the file, then restart the Maestro service.

# Configuring Slack Notifications

If you want to integrate with Slack to send you notifications about errors during the indexing process, you can update the application configuration file then restart the service.

To configure Slack:

1. From your command line, switch to the `config` directory and locate the `application.yml` file:

```shell
cd maestro/maestro-app/src/main/resources/config
```

2. Open the file, locate the `notifications` -> `slack` section and configure the following:

| Property | Description |
|----------|-------------|
| `enabled` | Set to `true` to enable Slack integration |
| `url` | URL to your Slack authentication token.  For details see the official Slack [documentation](https://slack.com/intl/en-ca/help/articles/215770388-Create-and-regenerate-API-tokens). |
| `channel` | Name of the Slack channel where you want notifications to be sent |
| `username` | Username required to access the channel |

```yaml
notifications:
    slack:
      enabled: false
      # the types to trigger a notification to this channel (see NotificationName.java)
      notifiedOn:
        - ALL
      url: https://hooks.slack.com/services/SECRET_TOKEN
      channel: maestro-alerts
      username: maestro
      maxDataLength: 1000
      # notifications has two parameters (TYPE [string], DATA[map])
      templates:
        error: ':bangbang: Error : ##TYPE##, Error Info: ```##DATA##```'
        warning: ':warning: ##TYPE## ```##DATA##```'
        info: ':information_source: ##TYPE## ```##DATA##```'
```

3. Save the file.


4. Optionally, if you are running [Maestro with Kubernetes], you must similarly modify your `values-override.yml` file.  Locate the `slack` section and modify the following:

| Property | Description |
|----------|-------------|
| `MAESTRO_NOTIFICATIONS_SLACK_ENABLED` | Set to `true` to enable Slack integration |
| `MAESTRO_NOTIFICATIONS_SLACK_URL` | URL to your Slack authentication token.  For details see the official Slack [documentation](https://slack.com/intl/en-ca/help/articles/215770388-Create-and-regenerate-API-tokens). |
| `MAESTRO_NOTIFICATIONS_SLACK_URL` | Name of the Slack channel where you want notifications to be sent |

```yaml
  # slack
  MAESTRO_NOTIFICATIONS_SLACK_ENABLED: "true"
  MAESTRO_NOTIFICATIONS_SLACK_URL: "secret"
  MAESTRO_NOTIFICATIONS_SLACK_CHANNEL: "maestro-argo-notif"
  ```

5. Restart the Maestro service.

# Configuring Exclusion Rules

In certain use cases, specific data records may need to excluded from indexing.  For example, prior to a major data release, some records may need to be excluded for business, data integrity, legal reasons, etc.

In the context of Song, Maestro supports this by providing configurable exclusion rules that omit specific analyses from being indexed based on metadata tags found in Song.  Specific analyses can be excluded by these identifiers: 

* Study ID
* Analysis ID
* File ID
* Sample ID
* Specimen ID
* Donor ID

If you need to add exclusion rules before indexing, you can update the application configuration file then restart the service.

To configure exclusion rules:

1. From your command line, switch to the `config` directory and locate the `application.yml` file:

```shell
cd maestro/maestro-app/src/main/resources/config
```

2. Open the file, locate the `exclusionRules` section and configure the following properties:

* `studyId`
* `analysis`
* `file`
* `sample`
* `specimen`
* `donor`

Each property is a comma-separated list of IDs you want to excluse from indexing for that particular entity.

<Warning>**NOTE:** Make sure to uncomment each property that you need to use when editing the file (remove the starting `#` symbol from each one you need).</Warning>

For example:

```yaml
  # exclusion rules configs
  exclusionRules:
    byId:
      studyId:
        - TEST-STUDY
#      analysis:
#        - 531had59-235f-315j-3918-gjaea93ga90j
#      file:
#        - 41ba4fb3-9428-50b5-af6c-d779cd59b04d
#      sample:
#        - a6381313-gaj3-eaif-95jd-nahnba9gn112
#      specimen:
#        - j928shgh-bme9-gka7-vac8-ga239sdaig98
#      donor:
#        - DO232991
```

6. Restart the Maestro service.