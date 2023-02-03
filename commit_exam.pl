#! /usr/bin/perl

$regex = '^(?<tag>.+):(?<message>.+)';

$sha = shift ;
$output_git_log = `git show $sha` ;

if($output_git_log =~ /$regex/gm){

    $tag = $+{tag};
    $message = $+{message};

    if($tag eq 'todo' or $tag eq 'done' or $tag eq 'progress'){
        print("message=$message\n");
    }else{
        die ;
    }

}else{
    die ;
}