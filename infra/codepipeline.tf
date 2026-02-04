resource "aws_codepipeline" "pipeline" {
  name     = "fullstack-pipeline"
  role_arn = aws_iam_role.codepipeline_role.arn

  artifact_store {
    location = aws_s3_bucket.pipeline_bucket.bucket
    type     = "S3"
  }

  ################
  # SOURCE STAGE
  ################
  stage {
    name = "Source"

    action {
      name             = "GitHub_Source"
      category         = "Source"
      owner            = "ThirdParty"
      provider         = "GitHub"
      version          = "1"
      output_artifacts = ["source_output"]

      configuration = {
        Owner      = var.github_owner
        Repo       = var.github_repo
        Branch     = var.github_branch
        OAuthToken = var.github_token
      }
    }
  }

  ################
  # DEPLOY STAGE (SSM)
  ################
  stage {
    name = "Deploy"

    action {
      name     = "DeployToEC2"
      category = "Invoke"
      owner    = "AWS"
      provider = "SSM"
      version  = "1"

      configuration = {
        DocumentName = aws_ssm_document.deploy_app.name
        InstanceIds  = jsonencode([
          "i-0f820681227d79757"   # 🔴 PUT YOUR REAL EC2 ID HERE
        ])
      }
    }
  }
}
