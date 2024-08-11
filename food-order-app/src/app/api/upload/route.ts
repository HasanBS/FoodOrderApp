import {PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

export async function POST(req: any) {
    const body = await req.formData();
    if (body.has('file')) {
        const file = body.get('file');

        const ext = file.name.split('.').pop();
        const newFileName = uniqid() + '.' + ext;

        const s3Client = new S3Client({
            region: 'eu-north-1',
            credentials: {
                accessKeyId: process.env.MY_AWS_ACCESS_KEY ?? '',
                secretAccessKey: process.env.MY_AWS_SECRET_KEY ?? '',
            },
        });
        const chuks = [];
        for await (const chuck of file.stream()) {
            chuks.push(chuck);
        }

        const buffer = Buffer.concat(chuks);

        const uploadResult = await s3Client.send(new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME ?? '',
            Key: newFileName,
            Body: buffer,
            ACL: 'public-read',
            ContentType : file.type,
        }));

        const link = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${newFileName}`;
        console.log('link', link);
        return Response.json({
            url: link,
        });

    }
    
}