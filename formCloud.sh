echo ":::: Staging deployment starting"

# local variables
CURRENT_DATE=$(date '+%Y%m%d%H%M%S')
PROJECT_NAME="hello-world"
ENV="dev"
BUCKET_NAME="deployment-files-bucket"
S3_SUBFOLDER="$CURRENT_DATE/compiled_templates"

echo ":::: Compiling stack templates"
cfn-include ./cloudformation/stacks/deploy-lambda-role.yml -y > ./cloudformation/compiled/deploy-lambda-role.yml
cfn-include ./cloudformation/stacks/deploy-lambda.yml -y > ./cloudformation/compiled/deploy-lambda.yml

echo ":::: Packaging stacks"

sam package \
    --template-file ./cloudformation/compiled/deploy-lambda-role.yml \
    --s3-bucket ${BUCKET_NAME} \
    --output-template-file cloudformation/packaged/deploy-lambda-role.yml

sam package \
    --template-file ./cloudformation/compiled/deploy-lambda.yml \
    --s3-bucket ${BUCKET_NAME} \
    --output-template-file cloudformation/packaged/deploy-lambda.yml

echo ":::: Uploading compiled stacks"
aws s3 sync \
    cloudformation/packaged/ s3://${BUCKET_NAME}/${S3_SUBFOLDER}/ \
    --exclude "*" \
    --include "*.yml"

echo ":::: Starting deployment"
sam deploy \
    --template-file cloudformation/deploy-master.yml \
    --stack-name hello-world-cfn \
    --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND \
    --parameter-overrides \
        ProjectName=${PROJECT_NAME} \
        Env=${ENV} \
        DeployFilesBucket=${BUCKET_NAME} \
        ArtifactsPath=${S3_SUBFOLDER} \
    --s3-bucket ${BUCKET_NAME} \
    --s3-prefix ${CURRENT_DATE}/deploy/${ENV}
