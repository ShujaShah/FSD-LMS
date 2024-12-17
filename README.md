Download DynamoDB from 
```
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html
```

Commands for Configuring the DynamoDB. Make sure to change the path for your instance

```
java -Djava.library.path=//Users/shshah/Downloads/dynamodb-local/DynamoDBLocal_lib -jar /Users/shshah/Downloads/dynamodb-local/DynamoDBLocal.jar -sharedDb -dbPath /Users/shshah/personal/lms-aws/dynamodb/code/run
```

To access dynamodb programatically, you need to install aws-cli
```
`https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
```

To configure AWS, run the command:
```
aws configure
```
```
AWS Access Key ID: fakeMyKeyId
AWS Secret Access Key: fakeSecretAccessKey
Default Region Name: fakeRegion
Default ouptput: json
```
Now Access dynamoDB locally:
```
aws dynamodb list-tables --endpoint-url http://localhost:8000
```
To Use the Seeded Data, Navigate to the Server and use the following command:
```
npm run seed
```
