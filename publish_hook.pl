#! /usr/bin/perl

# Author: Fiorentino Salvatore
# In the commit of pull request just insert: update_package_[ major | minor | patch ]

$regex = 'Author:\s+(?<author_username>\w+)\s+.+\nDate:\s+(?<day>\w+)\s(?<mounth>\w+)\s(?<day_number>\w+)\s(?<hour>\d{2}):(?<minute>\d{2}):(?<second>\d{2})\s(?<year>\d{4}).+\n+(?<message>(.|\n)+?)\ndiff';
$regex_inner_message_update_version = 'update_package_((?<major>major)|(?<minor>minor)|(?<patch>patch))';
$regex_bump_commit = 'ci: version bump to \d+.\d+.\d+' ;

$sha = shift ;
$output_git_log = `git show $sha` ;

if($output_git_log =~ /$regex/gm){

    $author_username = $+{author_username};
    $day = $+{day};
    $mounth = $+{mounth};
    $day_number = $+{day_number};
    $hour = $+{hour};
    $minute = $+{minute};
    $second = $+{second};
    $year = $+{year};
    $message = $+{message};
    
    if($message =~ /$regex_inner_message_update_version/gm){
        
        if($+{major}){
            print("update=major\n")
        }elsif($+{minor}){
            print("update=minor\n")
        }else{
            print("update=patch\n")
        }

    }elsif( $message =~ /$regex_bump_commit/gm ){
        print("update=bump_commit\n") ;
        exit ;
    }else{
        # Default
        print("update=patch\n")
    }

}else{
    die "Message doesn't match regex message\n";
}