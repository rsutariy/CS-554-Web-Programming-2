import React, { Component } from "react";
import { Link } from "react-router-dom";

class CharacterList extends Component {
  render() {
    const { characters } = this.props;
    if (characters.length === 0) {
      return <small>No characters yet!</small>;
    }

    const characterDisplays = characters.map(character => {
      const description = character.description ? (
        <p>{character.description}</p>
      ) : null;

      const { thumbnail } = character;
      const picture = thumbnail ? (
        <img
          className="img-responsive"
          src={`${thumbnail.path}.${thumbnail.extension}`}
          alt={character.name}
        />
      ) : null;

      return (
        <div className="col-sm-6 col-md-4" key={character.id}>
          <h3>
            <Link to={`/character/${character.id}`}>{character.name}</Link>
          </h3>
          {picture}
          {description}
        </div>
      );
    });

    return (
      <section>
        <div className="row">
          <div className="col-sm-8">
            <h2>Characters</h2>
            <div className="row">{characterDisplays}</div>
          </div>
        </div>
      </section>
    );
  }
}

export default CharacterList;
