import React, { Component } from 'react';
import firebase from '../store/reducers/firebase'

export default class ChangeStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arr: []
    }
  }
  componentDidMount = () => {
    firebase.firestore().collection('products').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        
        this.setState({ arr: this.state.arr.concat(doc.data()) })
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    });
  }
  render() {
    return (
      <div>

        {
          this.state.arr.map(l => {
            return (
              <div style={{}}>
                <div>
                  <img src={l.img} style={{ height: 100, width: 100 }}></img>
                  <p>
                    {l.name}
                  </p>
                  <p>cost :</p>
                  <form>
                    <label>
                      Cost:
                      <input type="number" name="cost" />
                    </label>
                    <label>
                      Stock:
                      <input type="number" name="stock" />
                    </label>

                  </form>
                  <button style={{ color: 'white', backgroundColor: '#E40046', borderRadius: 10 }}>Save Changes</button>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}
