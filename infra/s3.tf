resource "aws_s3_bucket" "pipeline_bucket" {
  bucket = "fullstack-pipeline-artifacts-${random_id.suffix.hex}"
}

resource "random_id" "suffix" {
  byte_length = 4
}
