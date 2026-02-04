############################
# EC2 IAM ROLE
############################

resource "aws_iam_role" "ec2_role" {
  name = "fullstack-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Service = "ec2.amazonaws.com"
      }
      Action = "sts:AssumeRole"
    }]
  })
}

############################
# EC2: READ BACKEND SECRETS
############################

resource "aws_iam_role_policy" "ec2_ssm_read_params" {
  name = "ec2-ssm-read-params"
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

############################
# EC2: ALLOW SSM RUN COMMAND
############################

resource "aws_iam_role_policy" "ec2_ssm_run_command" {
  name = "ec2-ssm-run-command"
  role = aws_iam_role.ec2_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ssm:SendCommand",
          "ssm:ListCommands",
          "ssm:ListCommandInvocations"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "ec2messages:*",
          "ssmmessages:*"
        ]
        Resource = "*"
      }
    ]
  })
}

############################
# EC2 INSTANCE PROFILE
############################

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "fullstack-ec2-profile"
  role = aws_iam_role.ec2_role.name
}
