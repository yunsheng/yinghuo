<?php

$CDN = 'http://yinghuo.com/';
 

$exp = '/(editor-pkg-min)/';
 

function get_contents($url){
    $ch =curl_init($url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $str =curl_exec($ch);
    curl_close($ch);
    if ($str !==false) {
        return $str;
    }else {
        return '';
    }  
}
 

function get_extend($file_name) { 
	$extend =explode("." , $file_name);
	$va=count($extend)-1;
	return $extend[$va];
} 
 

$header = array(
    'js' => 'Content-Type: application/x-javascript',
    'css' => 'Content-Type: text/css',
    'jpg' => 'Content-Type: image/jpg',
    'gif' => 'Content-Type: image/gif',    
    'png' => 'Content-Type: image/png',
    'jpeg' => 'Content-Type: image/jpeg',
    'swf' => 'Content-Type: application/x-shockwave-flash'
);
 

$type = '';
 

$files = array();
 

$tmp_files = array();
 

$prefix = $_SERVER['SCRIPT_NAME'];
$split_a= explode("??",$_SERVER['REQUEST_URI']);
$tmp_files = explode(",",$split_a[1]);
 
if(preg_match('/,/',$split_a[1])){
	$_tmp = explode(',',$split_a[1]);
	foreach($_tmp as $v){
		$files[] = $prefix.$v;
	}
}else{
	$files[] = $prefix.$split_a[1];
}
 
$R_files = array();
 
foreach ($files as $k) {
	    $k = preg_replace(
              array('/^\//','/\?.+$/'),
              array('',''),
            $k);
          if(!preg_match($exp,$k)){
              $k = preg_replace(
                  array('/-min\./'),
                  array('.'),
                  $k);
          } 
	
	if(!preg_match('/(\.js|\.css)$/',$k)){
		continue;
	}
	while(preg_match('/[^\/]+\/\.\.\//',$k)){
		$k = preg_replace(
			array('/[^\/]+\/\.\.\//'),
			array(''),
			$k,1);
	}
 
    if(empty($type)) {
	$type = get_extend($k);
    }
 
   
    if(file_exists($k)) {
		$R_files[] = file_get_contents($k);
    }else{
		try{
			$R_files[] = join("",file($CDN.$k));
            
		}catch(Exception $e){}
    }
}


header($header[$type]);
$result = join("\n",$R_files);
echo $result;
?>