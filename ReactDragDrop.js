class ReactDragDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draggedId: undefined,
      draggedIndex: undefined,
      tabList: undefined
    };
    this.dragStart = this.dragStart.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.drop = this.drop.bind(this);
  }

  dragStart(event) {
    const draggedLink = event.target;
    const draggedListItem = draggedLink.parentElement;
    const tabList = draggedListItem.parentElement.children;
    let draggedIndex = -1;
    
    for(let i = 0; i < tabList.length; i++) {
      if(tabList[i] === draggedListItem){
        draggedIndex = i;
      }
    }
    
    this.setState({
      draggedId: draggedLink.id,
      draggedIndex: draggedIndex,
      tabList: tabList
    });
    
    event.dataTransfer.setData("text", draggedLink.id);
  }

  dragOver(event) {
    event.preventDefault();
  }

  drop(event) {
    event.preventDefault();

    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data).parentElement;
    const tabList = this.state.tabList;
    const targetLink = event.target;
    const targetListItem = targetLink.parentElement;

    if(targetLink.id !== this.state.draggedId) {
      draggedElement.remove( draggedElement );
      let targetIndex = -1;

      for(let i = 0; i < tabList.length; i += 1) {
        if(tabList[i] === targetListItem){
          targetIndex = i;
        }
      }
      if(this.state.draggedIndex > targetIndex) {
        targetListItem.before( draggedElement );
      } else {
        targetListItem.after( draggedElement );
      }
    }
  }

  buildList() {
    return (
      <div>
        <ul className="testList">
          <li>
            <a 
              href="#" 
              id='li-1' 
              draggable={true} 
              onDragStart={this.dragStart} 
              onDragOver={this.dragOver} 
              onDrop={this.drop}>
              Number1
            </a>
          </li>
          <li>
            <a 
              href="#" 
              id='li-2' 
              draggable={true} 
              onDragStart={this.dragStart} 
              onDragOver={this.dragOver} 
              onDrop={this.drop}>
              Number2
            </a>
          </li>
          <li>
            <a 
              href="#" 
              id='li-3' 
              draggable={true} 
              onDragStart={this.dragStart} 
              onDragOver={this.dragOver} 
              onDrop={this.drop}>
              Number3
            </a>
          </li>
          <li>
            <a 
              href="#" 
              id='li-4' 
              draggable={true} 
              onDragStart={this.dragStart} 
              onDragOver={this.dragOver} 
              onDrop={this.drop}>
              Number4
            </a>
          </li>
        </ul>
      </div>
    );
  }

  render() {
    return (
      this.buildList()
    );
  }
}

ReactDOM.render(<ReactDragDrop />, document.querySelector("#app"))
