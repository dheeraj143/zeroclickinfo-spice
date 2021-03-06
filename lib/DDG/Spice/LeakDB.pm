package DDG::Spice::LeakDB;
# ABSTRACT: Plaintext of hashes, and hashes of plaintexts

use strict;
use DDG::Spice;

name 'LeakDB';
description 'Get plaintext or hash of input';
source 'leakdb.abusix.com';
primary_example_queries 'leakdb 21232f297a57a5a743894a0e4a801fc3';
secondary_example_queries 'hashme admin';
category 'special';
topics 'geek', 'sysadmin', 'cryptography';
icon_url 'https://leakdb.abusix.com/images/favicon.ico';
code_url 'https://github.com/brutalhonesty/zeroclickinfo-spice/blob/master/lib/DDG/Spice/HashMe.pm';
attribution github => ['https://github.com/brutalhonesty', 'Adam Schodde'],
    twitter => ['https://twitter.com/listeninme', 'Adam Schodde'],
    email => ['sparky1010[at]gmail.com', 'Adam Schodde'];
status 'enabled';

triggers startend => 'hashme', 'leakdb';
spice to => 'http://api.leakdb.abusix.com/?j=$1';
spice wrap_jsonp_callback => 1;

handle remainder => sub{
    return if $_ eq '';
    return $_;
};

1;

