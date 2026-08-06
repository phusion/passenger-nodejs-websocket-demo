Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network "forwarded_port", guest: 80, host: 3333
  config.vm.network "forwarded_port", guest: 3000, host: 3334
  config.vm.provision "shell", inline: <<-SHELL
    # Install our PGP key and add HTTPS support for APT
    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
    sudo apt-get install -y apt-transport-https ca-certificates
    # Add passenger repository
    sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger trusty main > /etc/apt/sources.list.d/passenger.list'
    sudo apt-get update
    # Add nodejs reposistory
    curl -sL https://deb.nodesource.com/setup | sudo bash -
    # Install Packages
    sudo apt-get install -y nginx nginx-extras passenger nodejs build-essential
    pushd /vagrant
    npm i
    popd
    # Link Configuration
    sudo rm /etc/nginx/nginx.conf
    sudo rm /etc/nginx/sites-enabled/*
    sudo ln -s /vagrant/nginx/nginx.conf /etc/nginx/
    sudo ln -s /vagrant/nginx/app /etc/nginx/sites-enabled/
    # Restart nginx
    sudo service nginx restart
  SHELL
end
