import React, { useState } from 'react';
import Icon from "../../../common/Icon";

const BackToTopArrow = () => {

  const [showScroll, setShowScroll] = useState(false)

  const checkScrollTop = () => {
    if (!showScroll && (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 40) {
      setShowScroll(true)
    } else if (showScroll && (window.innerHeight + window.scrollY) < document.body.offsetHeight - 40) {
      setShowScroll(false)
    }
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.addEventListener('scroll', checkScrollTop);

  return (
    <div onClick={scrollTop} style={{ height: 40, display: showScroll ? 'flex' : 'none' }}>
      <Icon name={'backTop'} size={32} />
    </div>
  );
}

export default BackToTopArrow;