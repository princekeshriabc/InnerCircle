resource "aws_ssm_association" "deploy_association" {
  name = aws_ssm_document.deploy_app.name

  targets {
    key    = "InstanceIds"
    values = ["i-0f820681227d79757"]
  }
}
