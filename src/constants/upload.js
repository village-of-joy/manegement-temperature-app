import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"


export const uploadJsonToS3 = async (json, fileName) => {
    // S3クライアントの設定
    const s3 = new S3Client({
        region: process.env.REACT_APP_AWS_REGION,
        credentials: {
            accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
            secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
        }
    });

    const bucketName = process.env.REACT_APP_AWS_S3_BUCKET_NAME;
    const keyName = fileName;
    const jsonData = json;

    const jsonString = JSON.stringify(jsonData);

    const params = {
        Bucket: bucketName,
        Key: keyName,
        Body: jsonString,
        ContentType: 'application/json'
    };

    try {
        const data = await s3.send(new PutObjectCommand(params));
        console.log('success: ',data)
    } catch (err) {
        console.error("error: ", err);
    }
};