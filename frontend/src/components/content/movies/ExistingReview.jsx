import React, { Component } from 'react';
import axios from "axios";
import { getHeaders } from '@auth/token';

export default class ExistingReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      existingReviewId: null,
      showReviewForm: false,
      editMode: false,
      rating: 0,
      review: "",
      tvShowId: props.tvShowId,
    };
  }

  componentDidMount() {
    this.fetchExistingReview();
  }

  fetchExistingReview = async () => {
    const { tvShowId } = this.state;
    try {
      const response = await axios.get(`/series/${tvShowId}/review`);
      if (response.data) {
        this.setState({
          editMode: true,
          existingReviewId: response.data.id,
          rating: response.data.rating,
          review: response.data.review,
        });
      }
    } catch (error) {
      console.error("Virhe arvostelun hakemisessa:", error);
    }
  };

  closeReviewForm = () => {
    this.setState({ showReviewForm: false });
  };

  openReviewForm = () => {
    this.setState({ showReviewForm: true });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { tvShowId, editMode, existingReviewId, rating, review } = this.state;
    const url = editMode
      ? `/reviews/update/${existingReviewId}`
      : `/series/${tvShowId}/review`;
    const method = editMode ? "put" : "post";
    const headers = getHeaders();
    try {
      await axios[method](url, {
        rating,
        review,
        mediatype: "1",
        revieweditem: `${tvShowId}`,
      }, { headers });
      window.location.reload();
    } catch (error) {
      console.error("Virhe arvostelun lisäämisessä/muokkaamisessa:", error);
    }
  };

  render() {
    const { showReviewForm, editMode, rating, review } = this.state;
    return (
      <>
        {!showReviewForm ? (
          <button onClick={this.openReviewForm} className="basicbutton">
            {editMode ? "Muokkaa arvostelua" : "Luo uusi arvostelu"}
          </button>
        ) : (
          <div id="createReview">
            <h2>{editMode ? "Muokkaa arvostelua" : "Uusi arvostelu"}</h2>

            <h4>Anna tähdet: </h4>
            <select
              className="field"
              type="number"
              id="rating"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => this.setState({ rating: e.target.value })}
              required
            >
              <option value="">Valitse arvio</option>
              <option value="1">&#11088; [1/5] tähteä</option>
              <option value="2">&#11088;&#11088; [2/5] tähteä</option>
              <option value="3">&#11088;&#11088;&#11088; [3/5] tähteä</option>
              <option value="4">&#11088;&#11088;&#11088;&#11088; [4/5] tähteä</option>
              <option value="5">&#11088;&#11088;&#11088;&#11088;&#11088; [5/5] tähteä</option>
            </select>
            <p>
              <h4>Perustelut:</h4>
              <textarea
                className="textBox"
                placeholder="..."
                id="review"
                value={review}
                onChange={(e) => this.setState({ review: e.target.value })}
                required
              ></textarea>
            </p>
            <button
              onClick={this.handleSubmit}
              disabled={rating < 1 || rating > 5}
              className="basicbutton"
            >
              {editMode ? "Tallenna muutokset" : "Lähetä arvostelu"}
            </button>
            <button onClick={this.closeReviewForm} className="basicbutton">
              Peruuta
            </button>
          </div>
        )}
      </>
    );
  }
}
