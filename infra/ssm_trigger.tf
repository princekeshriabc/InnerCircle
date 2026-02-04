resource "aws_ssm_association" "deploy_association" {
  name = aws_ssm_document.deploy_app.name

  targets {
    key    = "InstanceIds"
    values = ["i-023c14b85097c7710"]
  }
}
