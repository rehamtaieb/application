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
  auth_url    = "http://192.168.100.11/identity"
  region      = "RegionOne"
}

resource "openstack_compute_keypair_v2" "test-keypair" {
  name = "ssh-key"
}

resource "openstack_compute_instance_v2" "Cirros" {
  name            = "Ubuntu Minikube"
  image_id        = "b2889b1d-9957-40cc-8d4a-ae447fa476ed"
  flavor_id       = "d3"
  key_pair        = openstack_compute_keypair_v2.test-keypair.name
  security_groups = ["default"]
  network {
    name = "private"
  }
}

resource "openstack_networking_floatingip_v2" "fip" {
  pool = "public"
}

resource "openstack_compute_floatingip_associate_v2" "fip_assoc" {
  floating_ip = openstack_networking_floatingip_v2.fip.address
  instance_id = openstack_compute_instance_v2.Cirros.id
}
