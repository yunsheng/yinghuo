<?php
    interface Subject 
{ 
	public function Attach($Observer); //��ӹ۲��� 
	public function Detach($Observer); //�߳��۲��� 
	public function Notify(); //��������ʱ֪ͨ�۲��� 
	public function SubjectState($Subject); //�۲����� 
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
	public abstract function Update(); //����ͨ������ 
	} 

?>