resource "aws_instance" "app_server" {
  ami                    = "ami-0c398cb65a93047f2" # Ubuntu 22.04 (us-east-1)
  instance_type          = var.instance_type
  key_name               = var.key_name
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name
  vpc_security_group_ids = [aws_security_group.app_sg.id]

  user_data = file("../scripts/userdata.sh")

  tags = {
    Name = "fullstack-app"
  }
}
