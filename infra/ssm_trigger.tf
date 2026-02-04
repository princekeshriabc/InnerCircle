resource "aws_ssm_association" "deploy_association" {
  name = aws_ssm_document.deploy_app.name

  targets {
    key    = "InstanceIds"
    values = [aws_instance.app_server.id]
  }
}
