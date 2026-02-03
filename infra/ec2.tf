resource "aws_instance" "app_server" {
  ami                    = "ami-0c02fb55956c7d316"
  instance_type          = var.instance_type
  key_name               = var.key_name
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name
  user_data              = file("../scripts/userdata.sh")
  vpc_security_group_ids = [aws_security_group.app_sg.id]

  tags = {
    Name = "fullstack-app"
  }
}
