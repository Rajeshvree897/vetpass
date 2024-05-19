import { CustomError } from "../services/error-service";

const AWS = require('aws-sdk');
/** create s3 object */
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_SECRET
});

const errorHandler = (error: any) => {
  console.log(error);
  throw new Error('Something went wrong');
};

const awsS3 = {
  /**
   * Upload image file on public bucket
   */
  uploadPublicFileOnS3: async (file: { buffer: Buffer }, key: string) => {
    const option = {
      Bucket: process.env.AWS_BUCKET,
      Key: key.replace(/\s+/g, '_'),
      Body: file.buffer,
      ACL: 'public-read'
    };
    const response = await s3
      .upload(option)
      .promise()
      .catch((error: Error) => {
        console.log(error);
        throw new CustomError('Error in file uploading');
      });

    if (response) {
      response.Location = decodeURIComponent(response.Location);
    }
    return response;
  },

  /**
   * Delete file on public bucket
   */
  deletePublicFileFromS3: (key: string) => {
    const option = {
      Bucket: process.env.AWS_BUCKET,
      Key: key
    };
    return s3
      .deleteObject(option)
      .promise()
      .catch((error: Error) => errorHandler(error));
  },

  createVideoTranscodeJob: (fileKey: string, destinationFolder: string, userMetaData: any) => {
    return new Promise((resolve, reject) => {
      fileKey = `s3://${process.env.AWS_BUCKET}/${fileKey}`; // give file path after bucket name value
      destinationFolder = `s3://${process.env.AWS_BUCKET}/${destinationFolder}`;
      /* userMetaData.env = process.env.NODE_ENV; */
      const params = {
        "Queue": process.env.AWS_MEDIA_CONVERT_QUEUE,
        "UserMetadata": userMetaData,
        "Role": process.env.AWS_MEDIA_CONVERT_IAM_ROLE_ARN,
        "Settings": {
          "TimecodeConfig": {
            "Source": "ZEROBASED"
          },
          "OutputGroups": [
            {
              "CustomName": "Video",
              "Name": "File Group",
              "Outputs": [
                {
                  "ContainerSettings": {
                    "Container": "MP4",
                    "Mp4Settings": {}
                  },
                  "VideoDescription": {
                    "CodecSettings": {
                      "Codec": "H_264",
                      "H264Settings": {
                        "MaxBitrate": 1000000,
                        "RateControlMode": "QVBR",
                        "SceneChangeDetect": "TRANSITION_DETECTION"
                      }
                    }
                  },
                  "AudioDescriptions": [
                    {
                      "CodecSettings": {
                        "Codec": "AAC",
                        "AacSettings": {
                          "Bitrate": 96000,
                          "CodingMode": "CODING_MODE_2_0",
                          "SampleRate": 48000
                        }
                      }
                    }
                  ]
                },
                {
                  "ContainerSettings": {
                    "Container": "RAW"
                  },
                  "VideoDescription": {
                    "Width": 1280,
                    "Height": 720,
                    "CodecSettings": {
                      "Codec": "FRAME_CAPTURE",
                      "FrameCaptureSettings": {
                        "FramerateNumerator": 1,
                        "FramerateDenominator": 2,
                        "MaxCaptures": 2,
                        "Quality": 100
                      }
                    }
                  }
                }
              ],
              "OutputGroupSettings": {
                "Type": "FILE_GROUP_SETTINGS",
                "FileGroupSettings": {
                  "Destination": destinationFolder,
                  "DestinationSettings": {
                    "S3Settings": {
                      "AccessControl": {
                        "CannedAcl": "PUBLIC_READ"
                      }
                    }
                  }
                }
              }
            }
          ],
          "Inputs": [
            {
              "AudioSelectors": {
                "Audio Selector 1": {
                  "DefaultSelection": "DEFAULT"
                }
              },
              "VideoSelector": {},
              "TimecodeSource": "ZEROBASED",
              "FileInput": fileKey// "s3://vetpass-1/mediaconvert-source-file/Wildlife.wmv"
            }
          ]
        },
        "AccelerationSettings": {
          "Mode": "DISABLED"
        },
        "StatusUpdateInterval": "SECONDS_60",
        "Priority": 0
      };

      // Create a promise on a MediaConvert object
      AWS.config.mediaconvert = {endpoint : process.env.AWS_MEDIA_CONVERT_ENDPOINT};
      var endpointPromise = new AWS.MediaConvert({
        apiVersion: '2017-08-29',
        region: process.env.AWS_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_SECRET
      })
        .createJob(params)
        .promise();

      // Handle promise's fulfilled/rejected status
      endpointPromise.then(
        function (data: any) {
          console.log('Transcode job data', data);
          resolve(data);
        },
        function (err: any) {
          console.log('Transcode job error', err);
          reject(err);
        }
      );
    });
  }
};

export { awsS3 };
