<?php
require_once("/yinghuo/o/sql/conn.php");
class Article
{
	/**
	 * 添加数据
	 * @name add
	 * @param $title 标题
	 * @param $paragram 内容
	 */
	public function add($title,$intro,$paragram,$menuid){
		$time = date("Y-m-d H:i:s");
		conn_query("INSERT INTO article(title,intro,type,time,paragram) VALUES ('$title','$intro','$menuid','$time','$paragram')");
	}
	
	/**
	 * 删除数据
	 * @name del
	 * @param $id 文章id
	 */
	public function del($id){
	$time = date("Y-m-d H:i:s");
		conn_query("delete from article where id='$id'");
	}
	/**
	 * 更新数据
	 * @name update
	 * @param $id id标识符
	 * @param $title 标题
	 * @param $paragram 内容
	 */
	public function update($id,$title,$intro,$paragram,$menuid){

		conn_query("update article set title='$title',intro='$intro',paragram='$paragram',type='$menuid' where id='$id'");
		//关闭数据库链接

	}
	/**
	 * 获取所有文章列表
	 * @name getList
	 * @param $page 第几页
	 * @param $limit 每页显示个数
	 */
	public function getList($page,$limt){
        $start=$page*$limt;
		$logList = conn_select("SELECT * FROM article ORDER BY time DESC LIMIT $start, $limt");
		return $logList;
	}
	
	/**
	 * 通过文章类型获取文章列表
	 * @name getListByType
	 * @param $page 第几页
	 * @param $limit 每页显示个数
	 * @param $type 文章类型
	 */
	public function getListByType($page,$limt,$type){
        $start=$page*$limt;
		$logList = conn_select("SELECT * FROM article where type='$type' ORDER BY time DESC LIMIT $start, $limt");
		return $logList;
	}
	
	/**
	 * 通过ID获取文章列表
	 * @name getArticleById
	 * @param id 文章id标识符
	 */
	public function getArticleById($id){
       
		$articles= conn_select("SELECT * FROM article where id=$id");
		return $articles[0];
	}
}

?>