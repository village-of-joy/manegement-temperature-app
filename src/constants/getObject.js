import { S3Client, GetObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";

// S3クライアントの設定
const s3 = new S3Client({
    region: process.env.REACT_APP_AWS_REGION,
    credentials: {
        accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
    }
});

export const fetchJsonFromS3 = async (dirName, fileName) => {

    const bucketName = process.env.REACT_APP_AWS_S3_BUCKET_NAME;
    const keyName = `${dirName}/${fileName}`  // dirName/fileNameフォルダを指定

    const params = {
        Bucket: bucketName,
        Key: keyName
    };

    try {
        const response = await s3.send(new GetObjectCommand(params));
        if (!response.Body) throw new Error("S3から空のデータが返されました");
        
        // transformToStringで文字列に変換
        const bodyContents = await response.Body.transformToString();

        // JSON.parseでオブジェクトに変換
        const jsonData = JSON.parse(bodyContents);
        console.log("s3から取得したデータ:", jsonData)

        return jsonData
    } catch (err) {
        console.error("S3からのデータ取得エラー：", err);
        return null;
    }
}

export const listJsonFilesFromS3 = async (prefix) => {
    const command = new ListObjectsV2Command({
        Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
        Prefix: prefix,
    });

    const response = await s3.send(command);

    return (response.Contents || [])
        .filter(obj => obj.Key && obj.Key.endsWith('.json'))
        .map(obj => obj.Key.replace(`${prefix}/`, ""));
};