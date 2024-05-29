terraform {
  required_version = ">= 0.14.0"
  required_providers {
    openstack = {
      source  = "terraform-provider-openstack/openstack"
      version = "~> 1.53.0"
    }
  }
}

provider "openstack" {
  user_name   = "admin"
  tenant_name = "admin"
  password    = "secret"
  auth_url    = "http://192.168.22.85/identity"
  region      = "RegionOne"
}

# Generate an SSH key pair
resource "tls_private_key" "ssh_key" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "openstack_compute_keypair_v2" "ssh_key" {
  name       = "ssh-key"
  public_key = tls_private_key.ssh_key.public_key_openssh
}

resource "openstack_compute_instance_v2" "Cirros" {
  name            = "Ubuntu Minikube"
  image_id        = "acfe17f3-8d3a-484f-9975-f670cf750ffa"
  flavor_id       = "d3"
  key_pair        = openstack_compute_keypair_v2.ssh_key.name
  security_groups = ["default"]
  network {
    name = "shared"
  }
}

resource "openstack_networking_floatingip_v2" "fip" {
  pool = "public"
}

resource "openstack_compute_floatingip_associate_v2" "fip_assoc" {
  floating_ip = openstack_networking_floatingip_v2.fip.address
  instance_id = openstack_compute_instance_v2.Cirros.id
}

# Output the private key
output "private_key" {
  value     = tls_private_key.ssh_key.private_key_pem
  sensitive = true
}
