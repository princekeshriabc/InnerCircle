resource "aws_ssm_document" "deploy_app" {
  name          = "DeployFullstackApp"
  document_type = "Command"

  content = jsonencode({
    schemaVersion = "2.2"
    description   = "Deploy fullstack app from GitHub"
    mainSteps = [
      {
        action = "aws:runShellScript"
        name   = "deploy"
        inputs = {
          runCommand = [
            "cd /var/www",
            "rm -rf app",
            "git clone https://github.com/${var.github_owner}/${var.github_repo}.git app",
            "cd app",
            "chmod +x scripts/deploy.sh",
            "scripts/deploy.sh"
          ]
        }
      }
    ]
  })
}
