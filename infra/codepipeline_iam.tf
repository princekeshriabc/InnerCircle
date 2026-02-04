resource "aws_iam_role" "codepipeline_role" {
  name = "fullstack-codepipeline-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "codepipeline.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "codepipeline_policy" {
  role = aws_iam_role.codepipeline_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      # S3 access for pipeline artifacts
      {
        Effect = "Allow"
        Action = [
          "s3:GetObject",
          "s3:GetObjectVersion",
          "s3:PutObject"
        ]
        Resource = "*"
      },

      # Allow invoking SSM documents (Deploy stage)
      {
        Effect = "Allow"
        Action = [
          "ssm:SendCommand"
        ]
        Resource = "*"
      },

      # Allow passing IAM roles (required by CodePipeline)
      {
        Effect = "Allow"
        Action = [
          "iam:PassRole"
        ]
        Resource = "*"
      }
    ]
  })
}
