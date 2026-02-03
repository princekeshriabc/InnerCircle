resource "aws_iam_role" "ec2_role" {
  name = "fullstack-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = { Service = "ec2.amazonaws.com" }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "ec2_ssm_policy" {
  name = "ec2-ssm-policy"
  role = aws_iam_role.ec2_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "ssm:GetParameter",
        "ssm:GetParameters"
      ]
      Resource = "arn:aws:ssm:us-east-1:*:parameter/prod/backend/*"
    }]
  })
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "fullstack-ec2-profile"
  role = aws_iam_role.ec2_role.name
}

resource "aws_iam_role" "codebuild_role" {
  name = "fullstack-codebuild-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = { Service = "codebuild.amazonaws.com" }
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy" "codebuild_ssm_policy" {
  name = "codebuild-ssm-policy"
  role = aws_iam_role.codebuild_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = [
        "ssm:GetParameter"
      ]
      Resource = "arn:aws:ssm:us-east-1:*:parameter/prod/frontend/*"
    }]
  })
}
