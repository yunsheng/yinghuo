<?php
    interface Subject 
{ 
	public function Attach($Observer); //添加观察者 
	public function Detach($Observer); //踢出观察者 
	public function Notify(); //满足条件时通知观察者 
	public function SubjectState($Subject); //观察条件 
} 
class Boss Implements Subject 
{ 
	public $_action; 
	private $_Observer; 
	public function Attach($Observer) 
	{ 
		$this->_Observer[] = $Observer; 
		
	} 
	public function Detach($Observer) 
	{ 
		$ObserverKey = array_search($Observer, $this->_Observer,true); 
		if($ObserverKey !== false) 
		{ 
			unset($this->_Observer[$ObserverKey]); 
		} 
	} 
	public function Notify() 
	{ 
		foreach($this->_Observer as $value ) 
		{ 
			$value->Update(); 
		} 
	} 
	public function SubjectState($Subject) 
	{ 
		$this->_action = $Subject; 
	} 
} 
abstract class Observer 
{ 
	protected $_UserName; 
	protected $_Sub; 
	public function __construct($Name,$Sub) 
	{ 
		$this->_UserName = $Name; 
		$this->_Sub = $Sub; 
	} 
	public abstract function Update(); //接收通过方法 
	} 

?>